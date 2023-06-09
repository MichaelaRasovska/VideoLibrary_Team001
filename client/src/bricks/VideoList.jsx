import React, { useContext, useMemo, useState } from "react";
import VideoGridList from "./VideoGridList";
import VideoTableList from "./VideoTableList";
import AddVideoForm from "./AddVideoForm";
import UserContext from "../UserProvider";

//styling bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//icons mdi
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";

const VideoList = (props) => {
  const { canAddResource } = useContext(UserContext);
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";
  const [searchBy, setSearchBy] = useState("");

  const filteredVideoData = useMemo(() => {
    return props.videoData.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
        item.title.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy, props.videoData]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  };

  const handleSearchDelete = (event) => {
    if (!event.target.value) setSearchBy("");
  };

  return (
    <>
      <Form className="d-flex" onSubmit={handleSearch}>
        <Form.Control
          id={"searchInput"}
          style={{ maxWidth: "200px", marginRight: "8px" }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearchDelete}
        />
        <Button
          style={{ marginRight: "8px" }}
          variant="outline-dark"
          type="submit"
        >
          <Icon size={1} path={mdiMagnify} />
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={() =>
            setViewType((currentState) => {
              if (currentState === "grid") return "table";
              else return "grid";
            })
          }
        >
          <Icon size={0.7} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
          {isGrid ? "Tabulka" : "Grid"}
        </Button>
        {canAddResource() && (
          <AddVideoForm
            genreData={props.genreData}
            handleReload={props.handleReload}
          />
        )}
      </Form>
      <div className="grid">
        {isGrid ? (
          <VideoGridList
            videoData={filteredVideoData}
            genreData={props.genreData}
            handleReload={props.handleReload}
          />
        ) : (
          <VideoTableList videoData={filteredVideoData} />
        )}
      </div>
    </>
  );
};

export default VideoList;
