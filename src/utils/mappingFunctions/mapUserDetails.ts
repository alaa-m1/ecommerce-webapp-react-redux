import { UserDetails } from "types";


export declare type MapResponseFn<TDATA, RDATA = unknown> = (res: RDATA) => TDATA;
export const mapUserDetails: MapResponseFn<UserDetails, any> = (
  res: any
): UserDetails => {
  const userDetails: UserDetails = {
    displayName: Object.entries(res?.name as Record<string, string> || { "": "" }).flat()[1],
    email: Object.entries(res?.email as Record<string, string> || { "": "" }).flat()[1],
    phoneNumber: Object.entries(res?.mobile as Record<string, string> || { "": "" }).flat()[1],
    address: Object.entries(res?.address as Record<string, string> || { "": "" }).flat()[1],
    createdAt: Object.entries(res?.createdAt as Record<string, string> || { "": "" }).flat()[1],
    image:Object.entries(res?.image as Record<string, string> || { "": "" }).flat()[1],
  }
  return userDetails
};

