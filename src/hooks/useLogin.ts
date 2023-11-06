import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";





interface onLoginFail {
	onLoginFail: () => void
}

function useLogin({onLoginFail}: onLoginFail) {
	const navigate = useNavigate()


	const toast = useToast()

	return useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) => {
			try {
				const formData = new FormData();

				formData.append("email", email);
				formData.append("password", password);

				const res = await http.post("/login", formData);

				localStorage.setItem('accessToken', res.data.access_token);
				// window.location.href = "/home";
				navigate('/home')
			} catch (error: any) {
				onLoginFail()
				if (error?.response?.status === 403){
					toast({
						title: "Invalid username or password!",
						status: "warning",
						position: 'top',
					  });
				}
				return error;
			}
		},
		onError: (err) => console.log("Data error", err),
	});
}

export default useLogin;
