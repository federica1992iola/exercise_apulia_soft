import { styled } from "@mui/material";
import ExampleTable from "../example-table/ExampleTable";

interface MainProps {
    open?: boolean;
}
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0
    }),
  }));

export default function Home() {
    return <div>
        <Main sx={{ p: 3 }}>     
          <ExampleTable /> 
        </Main>
    </div>
}