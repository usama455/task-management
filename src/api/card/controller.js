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
    const { title, status, project, assignedTo, subTasks, comments } = req.body; 

    const newCard = new Card({
      title,
      status,
      project,
      assignedTo,
      subTasks,
      comments,
    });

    const cardInfo = await newCard.save();
    await cardInfo.populate("assignedTo", "firstName lastName email");
    const responseObject = {
      id: cardInfo.id,
      title: cardInfo.title,
      status: cardInfo.status,
      project: cardInfo?.project,
      assignedTo: cardInfo?.assignedTo,
      subTasks: cardInfo?.subTasks,
      comments: cardInfo?.comments,
      updatedAt: cardInfo?.updatedAt,
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
      .populate("assignedTo", "firstName lastName email")
      .select(
        "title project assignedTo subTasks comments status updatedAt createdAt"
      )
      .sort({ updatedAt: -1 });

    const cardsByStatus = {};

    // Group cards by status
    //todo-optimise this
    cards.forEach((card) => {
      if (!cardsByStatus[card.status]) {
        cardsByStatus[card.status] = [card];
      } else {
        cardsByStatus[card.status].push(card);
      }
    });

    // Create response object
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
