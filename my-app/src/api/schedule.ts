import { message } from "antd";
import axios from "axios";
import { store } from "../utils/store";

export type ScheduleItemStatusType =
  | "warning"
  | "success"
  | "error"
  | "processing"
  | "default";

enum OWNTYPE {
  "own" = 1,
  "partner",
  "together",
}

export interface ScheduleItemsReq {
  date: string;
  uid: number;
}

export interface ScheduleItemResp {
  content: string;
  date: string;
  ownType: OWNTYPE;
  statusType: ScheduleItemStatusType;
  uid: number;
}

interface AddScheduleItemReq extends ScheduleItemResp {}

interface ModifyScheduleItemReq extends ScheduleItemResp {
  dateId: number;
}
export const GetScheduleDetail = (payload: ScheduleItemsReq) => {
  axios({
    url: "/getScheduleWithUserIdAndDate",
    method: "get",
    params: payload,
  }).then();
};

export const AddScheduleDetail = (payload: AddScheduleItemReq) => {
  axios({
    url: "/addScheduleItem",
    method: "post",
    params: payload,
  }).then((response) => {
    switch (response.data.ErrorCode) {
      case 0:
        message.success("添加成功", 1);
        break;
      default:
        message.info(response.data.Descript, 1);
    }
  });
};

export const ModifyScheduleDetail = (payload: ModifyScheduleItemReq) => {
  axios({
    url: "/modifyScheduleItem",
    method: "post",
    params: payload,
  }).then((response) => {
    switch (response.data.ErrorCode) {
      case 0:
        message.success("修改成功", 1);
        break;
      default:
        message.info(response.data.Descript, 1);
    }
  });
};

export const DeleteScheduleDetail = (dateId: number) => {
  axios({
    url: "/deleteScheduleItem",
    method: "post",
    params: { dateId },
  }).then((response) => {
    switch (response.data.ErrorCode) {
      case 0:
        message.success("删除成功", 1);
        break;
      default:
        message.info(response.data.Descript, 1);
    }
  });
};
