import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

interface UserProfile {
  email: string;
  id: number;
  created_at: string; // Replace with the appropriate date type if necessary
  name: string;
}

function useMyProfile(accessToken: string | null) {
  const toast = useToast();

  return useQuery<UserProfile, Error>({ queryKey: ["myProfile"], queryFn: async () => {
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    try {
      const res = await http.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
      }
      throw error;
    }
  }});
}

export default useMyProfile;
