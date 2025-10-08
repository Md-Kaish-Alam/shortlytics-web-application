import { useQuery } from "@tanstack/react-query";

import api from "../api/api";

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["urlTotalClicks"],
    queryFn: async () => {
      return await api.get(
        "api/urls/total-clicks?startDate=2025-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    select: (data) => {
      // data.data =>
      // {
      //   "2025-01-01": 10,
      //   "2025-01-02": 56,
      //   "2025-01-03": 110,
      // }
      const convertToArray = Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key],
      }));
      // Object.keys(data.data) => ['2025-01-01', '2025-01-02', '2025-01-03']
      // map through the array and return an object with clickDate and count
      // [
      //   { clickDate: '2025-01-01', count: 10 },
      //   { clickDate: '2025-01-02', count: 56 },
      //   { clickDate: '2025-01-03', count: 110 },
      // ]
      return convertToArray;
    },
    onError,
    staleTime: 5000,
  });
};
