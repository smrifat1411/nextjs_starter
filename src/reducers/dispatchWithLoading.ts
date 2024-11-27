const dispatchWithLoading =
  <
    T extends { type: string; payload?: unknown }, // Action type for dispatch
    Args extends unknown[], // Arguments for the async function
    Result // Return type of the async function
  >(
    dispatch: React.Dispatch<T>, // Reducer dispatch function
    asyncAction: (...args: Args) => Promise<Result>, // The async function to wrap
    setLoadingState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, // Loading state handler
    actionKey: string // Unique key for the action
  ) =>
  async (...args: Args): Promise<Result> => {
    setLoadingState((prev) => ({ ...prev, [actionKey]: true })); // Start loading
    try {
      const result = await asyncAction(...args); // Execute async function
      return result; // Return result for further use
    } finally {
      setLoadingState((prev) => ({ ...prev, [actionKey]: false })); // Stop loading
    }
  };

export default dispatchWithLoading;
