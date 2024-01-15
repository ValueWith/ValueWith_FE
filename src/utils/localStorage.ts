const ACCESS_TOKEN_KEY = 'accessToken';
const USER_INFO_KEY = 'userInfo';
const GROUP_THUMBNAIL_KEY = 'groupThumbnail';

export interface UserInfo {
  memberId: number;
  memberNickname: string;
  memberEmail: string;
  memberProfileUrl: string;
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(USER_INFO_KEY) || 'null') as UserInfo;
}

export function setUserInfo(userInfo: UserInfo) {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

export function removeUserInfo() {
  localStorage.removeItem(USER_INFO_KEY);
}

export function getGroupThumbnail() {
  return localStorage.getItem(GROUP_THUMBNAIL_KEY);
}

export function setGroupThumbnail(groupThumbnail: string) {
  localStorage.setItem(GROUP_THUMBNAIL_KEY, groupThumbnail);
}

export function removeGroupThumbnail() {
  localStorage.removeItem(GROUP_THUMBNAIL_KEY);
}
