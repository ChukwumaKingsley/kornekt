import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface UserProfile {
  email: string;
  id: number;
  created_at: string; // Replace with the appropriate date type if necessary
  name: string;
  votes_count: number;
  downvotes_count: number;
  posts_count: number;
  profile_pic: string;
}

function useMyProfile() {
  const toast = useToast();
  const navigate =  useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    window.location.href = '/'
  }
  
  return useQuery<UserProfile, Error>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken')
      try {
        const res = await http.get("/users/me", {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
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
          // navigate('/');
        } else if (error.response && error.response.status === 400) {
          toast({
            title: "Login required",
            status: "warning",
            position: "top",
            duration: 1,
          });
          localStorage.removeItem('accessToken')
          navigate('/');
        } else {
          toast({
            title: 'Server not reachable',
            containerStyle: {
              backgroundColor: "red",
							color: "white",
		        },
            
          })
        }
      }
    },
  });
}

export default useMyProfile;
