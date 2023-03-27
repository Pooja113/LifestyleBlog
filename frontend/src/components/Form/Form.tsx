import { TextField, Button, Card, Grid, Typography } from "@mui/material";
import { FormContainer, FormTitle, InputContainer } from "./Form.style";
import { useDispatch } from "react-redux";
const Form = () => {
  const dispatch = useDispatch();
  return (
    <FormContainer>
      <InputContainer>
        <FormTitle>Create a Post</FormTitle>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          margin="normal"
          // value={postData.title}
          // onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          // value={postData.message}
          // onChange={(e) =>
          //   setPostData({ ...postData, message: e.target.value })
          // }
        />
        <Button variant="contained" size="large" type="submit" fullWidth>
          Submit
        </Button>
      </InputContainer>
    </FormContainer>
  );
};

export default Form;
