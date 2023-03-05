import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Pdf from "react-to-pdf";
import moment from "moment/moment";
export default function DownloadPdf({ data }) {
  const ref = React.createRef();
  return (
    <Stack>
      <div
        style={{
          border: "1px dashed #ccc",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "20px",
          }}
          ref={ref}
        >
          <Typography
            align="center"
            variant="bold"
            component="h1"
            fontWeight={900}
            fontFamily={"serif"}
          >
            Your School Name
          </Typography>
          <Typography
            align="center"
            variant="bold"
            component="h3"
            fontWeight={700}
            fontFamily={"serif"}
            sx={{ color: "gray" }}
          >
            School Address
          </Typography>
          <List dense={true}>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Addmission Date: </strong>
                {data ? moment(data.createdAt).format("MMM Do YY") : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Student Name: </strong>
                {data ? data.name : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Gender: </strong>
                {data ? data.gender : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Date of Birth: </strong>
                {data ? data.dob : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Student ID: </strong>
                {data ? data.studentId : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Class Name: </strong>
                {data ? data.className : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Roll Number: </strong>
                {data ? data.rollNumber : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Phone: </strong>
                {data ? data.phone : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Email: </strong>
                {data ? data.email : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Address: </strong>
                {data ? data.address : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>{"Father's Name:"} </strong>
                {data ? data.fatherName : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>{"Mother's Name:"} </strong>
                {data ? data.motherName : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>{"Guardian's Contact Number:"} </strong>
                {data ? data.guardianContactNumber : null}
              </ListItemText>
            </ListItem>
            <br></br>
            <Typography>Student Portal Login Info</Typography>
            <Divider></Divider>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Website URL: </strong>
                https://www.schoolDomainName.com/student-portal
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Student ID: </strong>
                {data ? data.studentId : null}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>Password: </strong>Collect from office
              </ListItemText>
            </ListItem>

            <br></br>
            <Typography>School Website</Typography>
            <Divider></Divider>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                <strong>School Website URL: </strong>
                https://www.schoolDomainName.com
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText>
                Visite webite to check class routine, noticeboard, result and more
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </div>
      <br></br>
      <Typography align="right">
        <Pdf
          targetRef={ref}
          filename={`Student Information-${data ? data.name : null}`}
        >
          {({ toPdf }) => (
            <Button
              variant="contained"
              color="yallo"
              endIcon={<FileDownloadIcon />}
              onClick={toPdf}
              size="small"
            >
              Download
            </Button>
          )}
        </Pdf>
      </Typography>
    </Stack>
  );
}
