import {Request} from "express";


export const getSessionIdFromCookie = (req: Request) => {
  const {sessionId} = req.cookies;

  return sessionId;
}

export const getUserIdFromCookie = (req: Request) => {
  const {userId} = req.cookies;

  return userId;
}