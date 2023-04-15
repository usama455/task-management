import { body } from "express-validator";




const requiredFields = {
    title: 'string',
    project: 'string',
    assignedTo: 'object',
    subTasks: 'array',
    comments: 'array',
  };
  
export const createCardValidations =   [
    body('title').notEmpty().withMessage('Title is required.'),
    body('project').isIn(['a', 'b', 'c']).withMessage('Project must be one of: a, b, c.'),
    body('assignedTo').isArray().withMessage('Assigned to must be an array.'),
    body('subTasks').isArray().withMessage('Sub tasks must be an array.'),
    body('comments').isArray().withMessage('Comments must be an array.'),
    // checkRequiredFields(requiredFields),
  ]