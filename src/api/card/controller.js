import { logger } from "../../utils";
import {
  errorResponse,
  responseMessage,
  responseStatus,
  successResponse,
} from "../../utils/response";
import Card from "./model";

export const createCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, status, project } = req.body;

    const newCard = new Card({
      title,
      status,
      project,
      createdBy: userId,
    });

    const cardInfo = await newCard.save();
    await cardInfo.populate("createdBy", "firstName lastName email");

    const responseObject = {
      id: cardInfo.id,
      title: cardInfo.title,
      status: cardInfo.status,
      createdBy: cardInfo.createdBy,
      updatedAt: cardInfo.updatedAt,
    };
    return successResponse(
      res,
      responseObject,
      responseMessage.created,
      responseStatus.created
    );
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err.message);
  }
};

export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find()
      .populate("createdBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email")
      .select(
        "title project assignedTo subTasks comments status createdBy updatedAt createdAt"
      )
      .sort({ updatedAt: -1 });

    const cardsByStatus = cards.reduce((result, card) => {
      const status = card.status;
      if (!result[status]) {
        result[status] = [card];
      } else {
        result[status].push(card);
      }
      return result;
    }, {});

    const responseObject = {};
    Object.keys(cardsByStatus).forEach((status) => {
      responseObject[status] = cardsByStatus[status];
    });

    return successResponse(
      res,
      responseObject,
      responseMessage.success,
      responseStatus.success
    );
  } catch (err) {
    logger.error(err.message);
    return errorResponse(res, err.message);
  }
};
