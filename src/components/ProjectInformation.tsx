import type { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";

const ProjectInformation = ({
  state,
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}) => {
  return (
    <Modal state={state} title="Project Information">
      ProjectInformation
    </Modal>
  );
};

export default ProjectInformation;
