import { resposeStatus, messages, errors } from "../constants/response";

export const success = (res, data = {}) => {
	return res.status(resposeStatus.ok).json({ success: true, message: messages.retrieved, data });
};

export const created = (res, data = {}) => {
	return res.status(resposeStatus.created).json({ success: true, message: messages.created, data });
};

export const updated = (res, data = {}) => {
	return res.status(resposeStatus.updated).json({ success: true, message: messages.updated, data });
};

export const deleted = (res, data = {}) => {
	return res.status(resposeStatus.updated).json({ success: true, message: messages.deleted, data });
};

export const notFound = (res, data = {}) => {
	return res.status(resposeStatus.notFound).json({ success: false, message: messages.notFound, data });
};

export const validPassword = (res) => {
	return res.status(resposeStatus.ok).json({ success: true, message: messages.validPassword });
};

export const wrongPassword = (res) => {
	return res.status(resposeStatus.badRequest).json({ success: false, message: errors.wrongPass });
};

export const error = (res, message, data = {}) => {
	return res.status(resposeStatus.internalError).json({ success: false, message, data });
};
