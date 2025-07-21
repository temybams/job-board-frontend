import axios from "axios";

export const getAllHandler = async (url) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;
};

export const getSingleHandler = async (url) => {
    const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const res = await axios.get(url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return res?.data?.data;
};

export const postHandler = async ({ url, body }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

  return await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const updateHandler = async ({ url, body }) => {

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Unauthorized: No token found");
        }
  const res = await axios.patch(url, body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }

  );
  return res?.data?.data;
};

export const updateHandlerPut = async ({ url, body }) => {
  
  return await axios.put(url, body);
};

export const deleteHandler = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Unauthorized: No token found");
        }

        

  return await axios.delete(url);
};
