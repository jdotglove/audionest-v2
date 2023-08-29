import React from "react";
import { ListGroup } from "react-bootstrap";
import ChartContext from "../../contexts/ChartContext";

export default function TrackSelector({
  // setSelectedTracks,
  track,
}: {
  // setSelectedTracks: Function;
  track: Audionest.Track;
}) {
  return (
    <ChartContext.Consumer>
      {({ setChartData }) => (
        <ListGroup.Item
          action
          variant="dark"
          eventKey={`${track.id}`}
          onClick={async () => {
            // setSelectedTracks([track.id]);
            await setChartData([track.id]);
          }}
        >
          {track ? track.name : ""}
        </ListGroup.Item>
      )}
    </ChartContext.Consumer>
  );
}
