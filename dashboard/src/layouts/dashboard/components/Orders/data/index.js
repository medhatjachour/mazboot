// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiProgress from "components/SuiProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "companies", align: "left" },
      { name: "members", align: "left" },
      { name: "budget", align: "center" },
      { name: "completion", align: "center" },
    ],

    rows: [
      {
        companies: [logoXD, "first oreder"],
        members: (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team1, "item 1 name"],
              [team2, "item 2 name"],
              [team3, "item 3 name"],
              [team4, "item 4 name"],
            ])}
          </SuiBox>
        ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </SuiTypography>
        ),
        completion: (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={60} color="info" variant="gradient" label={false} />
          </SuiBox>
        ),
      },
      {
        companies: [logoAtlassian, "second order"],
        members: (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team2, "item 2 name"],
              [team4, "item 4 name"],
            ])}
          </SuiBox>
        ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </SuiTypography>
        ),
        completion: (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={10} color="info" variant="gradient" label={false} />
          </SuiBox>
        ),
      },
      {
        companies: [logoSlack, "add imgs path"],
        members: (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team1, "item 1 name"],
              [team3, "item 3 name"],
            ])}
          </SuiBox>
        ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            Not set
          </SuiTypography>
        ),
        completion: (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={100} color="success" variant="gradient" label={false} />
          </SuiBox>
        ),
      },
      {
        companies: [logoSpotify, "Launch our Mobile App"],
        members: (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team4, "item 4 name"],
              [team3, "item 3 name"],
              [team2, "item 2 name"],
              [team1, "item 1 name"],
            ])}
          </SuiBox>
        ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </SuiTypography>
        ),
        completion: (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={100} color="success" variant="gradient" label={false} />
          </SuiBox>
        ),
      },
      {
        companies: [logoJira, "Add the New Pricing Page"],
        members: (
          <SuiBox display="flex" py={1}>
            {avatars([[team4, "item 4 name"]])}
          </SuiBox>
        ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $500
          </SuiTypography>
        ),
        completion: (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={25} color="info" variant="gradient" label={false} />
          </SuiBox>
        ),
      },
      {
        companies: [logoInvesion, "Redesign New Online Shop"],
        members: (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team1, "item 1 name"],
              [team4, "item 4 name"],
            ])}
          </SuiBox>
        ),
        budget: (
          <SuiTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </SuiTypography>
        ),
        completion: (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={40} color="info" variant="gradient" label={false} />
          </SuiBox>
        ),
      },
    ],
  };
}
