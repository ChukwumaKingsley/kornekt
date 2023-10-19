import { Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { RefObject, useRef, useState } from "react";


export default function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: RefObject<FocusableElement> = useRef();

  const handleClick = () => {
    setIsOpen(true);
  }

  const handleLogout = () => {
    // Clear the access token and perform logout actions
    // Then redirect the user to the desired location
    localStorage.removeItem("token");
    onClose();
    window.location.href = "/";
  }

  return (
    <>
      <Text as="span" cursor="pointer" textAlign="center" onClick={handleClick}>
        Logout
      </Text>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirm Logout</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
