import { UserDetails } from "types";


export declare type MapResponseFn<TDATA, RDATA = unknown> = (res: RDATA) => TDATA;
export const mapUserDetails: MapResponseFn<UserDetails, any> = (
  res: any
): UserDetails => {
  const userDetails: UserDetails = {
    displayName: Object.entries(res?.name as Object || { "": "" }).flat()[1],
    email: Object.entries(res?.email as Object || { "": "" }).flat()[1],
    phoneNumber: Object.entries(res?.mobile as Object || { "": "" }).flat()[1],
    address: Object.entries(res?.address as Object || { "": "" }).flat()[1],
    createdAt: Object.entries(res?.createdAt as Object || { "": "" }).flat()[1],
  }
  return userDetails
};

