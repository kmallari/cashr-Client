const getDirtyFields = <
  TData extends Record<keyof TDirtyItems, unknown>,
  TDirtyItems extends Record<string, unknown>,
>(
  formValues: TData,
  dirtyItems: TDirtyItems,
): Partial<TData> => {
  return Object.entries(dirtyItems).reduce((dirtyData, [key, value]) => {
    if (value === false) return dirtyData;
    if (value === true)
      return { ...dirtyData, [key]: formValues[key], id: formValues.id };

    const child = getDirtyFields(
      formValues[key] as TData,
      dirtyItems[key] as TDirtyItems,
    );

    if (typeof child === "object" && Object.keys(child).length === 0) {
      return dirtyData;
    }

    if (Array.isArray(child) && child.length === 0) {
      return dirtyData;
    }

    return {
      ...dirtyData,
      [key]: child,
    };
  }, {});
};

export { getDirtyFields };
