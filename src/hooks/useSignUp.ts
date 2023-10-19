import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

function useSignUp(onSignUpSuccess: () => void) {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
      try {
        const formData = { name, email, password };

        const res = await http.post("/users", formData);

        if (res.status === 201) {
          toast({
            title: "Sign up success! Proceed to login!",
            status: "success",
			position: 'top'
          });
        //   navigate("/");
		onSignUpSuccess();
        }
      } catch (error: any) {
        if (error.response) {
          // The request was made, but the server responded with a status code that falls out of the range of 2xx
          if (error.response.status === 400) {
            toast({
              title: "User with this email already exists",
              status: "error",
			  position: 'top'
            });
        } else if (error.response.status === 422) {
			toast({
				title: "Invalid email address",
				status: "warning",
				position: 'top',
			  });
		}else {
          // Handle other types of errors or exceptions
          // For example, network error
          console.error("Error:", error);
        }
          }
      }
    },
    onSuccess: (data) => console.log("Success data", data),
  });
}

export default useSignUp;
