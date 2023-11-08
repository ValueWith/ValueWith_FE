export const findCodeByLabel = (type: string, label: string, option: any) => {
  switch (type) {
    case 'area': {
      const area = option.find(
        (item: { label: string }) => item.label === label
      );
      return area ? area.code : null;
    }
    case 'category': {
      const category = option.find(
        (item: { label: string }) => item.label === label
      );
      return category ? category.code : null;
    }
    default:
      return;
  }
};
