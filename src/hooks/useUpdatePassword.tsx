import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

interface UserProfile {
  name: string; // Add the 'name' field to UserProfile
  id: number,
  email: string,
}

function useUpdatePassword(accessToken: string | null, name: string) {
  const toast = useToast();

  return useQuery<UserProfile, Error>({
    queryKey: ["updateMyProfile"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      try {
        const res = await http.put("/users/update", {
          name, 
        });

        return res.data;
      } catch (error: any) {
        // Handle specific error status codes
        if (error.response && error.response.status === 403) {
          toast({
            title: "Invalid access token",
            status: "warning",
            position: "top",
          });
        } else if (error.response && error.response.status === 400) {
          toast({
            title: "Login required",
            status: "warning",
            position: "top",
            duration: 1,
          });
          window.location.href = "/";
        }
        // throw error;
      }
    },
  });
}

export default useUpdatePassword;