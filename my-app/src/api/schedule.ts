import { message } from "antd";
import axios from "axios";

export type ScheduleItemStatusType =
  | "Warning"
  | "Success"
  | "Error"
  | "Processing"
  | "Default";

export type OWNTYPE = "own" | "partner" | "together";

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

export interface ModifyScheduleItemReq extends ScheduleItemResp {
  id: number;
  dateId: number;
}
export const GetMonthScheduleDetail = async (payload: ScheduleItemsReq) => {
  const res = await axios({
    url: "/getMonthScheduleWithUserIdAndDate",
    method: "get",
    params: payload,
  });
  if (res.status === 200 && res.data.ErrorCode === 0) {
    return res.data.Schedule;
  }
  return [];
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
    params:  {dateId} ,
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
