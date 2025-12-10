import {
  post,
  get,
  put
} from "../api.js";

export const addAn=(params)=>{
	return post(`/announcements/addAnnouncement?`+params) 
}

export const pubAn=(params)=>{
	return put(`/announcements/publishAnnouncement?`+params) 
}

export const getAnList=(params)=>{
	return get(`/announcements/getAnnouncementListByDate?`+params)
}

export const testList=(params)=>{
	return post('/admin/approveAnnouncement',params)
}