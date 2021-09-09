import React, { useState } from "react";
// import Typography from "@material-ui/core/Typography"
import {
  Button,
  Typography,
  Container,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl
} from "@material-ui/core";
// import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: {
    marginBottom: 20,
    marginTop: 20,
    display: "block",
  },
});
export default function Create() {
  const classes = useStyles();
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleErr, setTitleErr] = useState(false)
  const [detailsErr, setDetailsErr] = useState(false)
  const [category, setCategory] = useState('todos')
  const submitHandler = e => {
    e.preventDefault()
    setTitleErr(false)
    setDetailsErr(false)
    if (title.trim().length === 0) {
      setTitleErr(true)
    }
    if (details.trim().length === 0) {
      setDetailsErr(true)
    }
    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  }
  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="false" onSubmit={submitHandler}>
        <TextField
          className={classes.field}
          onChange={e => setTitle(e.target.value)}
          label="Note Title"
          color="secondary"
          variant="outlined"
          fullWidth
          required
          error={titleErr}
        />
        <TextField
          className={classes.field}
          onChange={e => setDetails(e.target.value)}
          label="Details"
          color="secondary"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsErr}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category </FormLabel>
          <RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminder" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button

          type="submit"
          color="secondary"
          variant="contained"
          // startIcon={< SendIcon />}
          endIcon={<KeyboardArrowRightIcon />}
        >

          Submit
        </Button>
      </form>


      <br />
    </Container>
  );
}
