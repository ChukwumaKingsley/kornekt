import { Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";


export default function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: any = useRef();

  const handleClick = () => {
    setIsOpen(true);
  }

  const handleLogout = () => {
    // Clear the access token and perform logout actions
    // Then redirect the user to the desired location
    localStorage.clear();
    onClose();
    window.location.href = "/";
  }

  return (
    <>
      <Text as="span" cursor="pointer" textAlign="center" onClick={handleClick} marginRight={{base: '10px'}} fontSize={{base: '12px', md: '20px'}}>
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
