import { Box, Text, Badge, IconButton, HStack, Stack, Spacer, Flex } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';


export interface PostData {
    post_id: number;
    title: string;
    content: string;
    created_at: string;
    user_name: string;
    vote_count: number;
    downvote_count: number;
  }
  
const Post = (post: any) => {
    console.log(post)
    console.log(post?.post?.down)
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" shadow="md" key={post.post_id}>
      <Text fontSize="xl" fontWeight="bold">
        {post.post.title}
      </Text>
      <Text fontSize="md" my="2">
        {post.post.content}
      </Text>
      <Flex alignItems="center">
        <Text fontSize="sm" color="gray.500">
          Posted by {post.post.user_name} on {new Date(post.post.created_at).toLocaleString()}
        </Text>
        <Spacer />
        <HStack spacing={1}>

            <Text>{post.post.vote_count}</Text>
          <IconButton
            size="sm"
            bg={'blue.300'}
            aria-label="Upvote"
            icon={<ChevronUpIcon />}
          />
          <Text>{post.post.downvote_count}</Text>
          <IconButton
            size="sm"
            bg={'red.300'}
            aria-label="Downvote"
            icon={<ChevronDownIcon />}
          >
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Post;
