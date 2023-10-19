import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

interface onLoginFail {
	onLoginFail: () => void
}

function useLogin({onLoginFail}: onLoginFail) {

	const toast = useToast()

	return useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) => {
			try {
				const formData = new FormData();

				formData.append("email", email);
				formData.append("password", password);

				console.log(formData)

				const res = await http.post("/login", formData);

				console.log("ress", res);

				localStorage.setItem("token", res.data.access_token);

				window.location.href = "/home";
			} catch (error: any) {
				onLoginFail()
				if (error.response.status === 403){
					toast({
						title: "Invalid username or password!",
						status: "warning",
						position: 'top',
					  });
				}
				return error;
			}
		},
		onSuccess: (data) => console.log("Login data", data),
		onError: (err) => console.log("Data error", err),
	});
}

export default useLogin;
