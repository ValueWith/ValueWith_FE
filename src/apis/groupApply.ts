import instance from '.';

export const postGroupApply = async (tripGroupId: string) => {
  try {
    const response = await instance.post(
      `/api/groups/application/${tripGroupId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
};
