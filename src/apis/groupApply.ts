import instance from '.';

export const postGroupApply = async (tripGroupId: number) => {
  try {
    const response = await instance.post(
      `/api/groups/application/${tripGroupId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error Post data: ', error);
    throw error;
  }
};

export const deleteGroupApply = async (tripGroupId: number) => {
  try {
    const response = await instance.delete(
      `/api/groups/application/${tripGroupId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error Delete data: ', error);
    throw error;
  }
};

export const patchGroupApply = async (tripGroupId: number) => {
  try {
    const response = await instance.patch(
      `/api/groups/${tripGroupId}/member/left`
    );
    return response.data;
  } catch (error) {
    console.error('Error Patch data: ', error);
    throw error;
  }
};
