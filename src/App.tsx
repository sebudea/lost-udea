// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { Divider, IconButton, Typography } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";

// import "./App.css";

// function App() {
//   return (
//     <div className="container">
//       <Typography variant="h2">Lost UdeA</Typography>

//       <div className="child">
//         <div>
//           <Typography variant="h4">¿Encontraste un Objeto?</Typography>
//         </div>

//         <Divider sx={{ width: "90%", my: 2 }} />

//         <div className="decision">
//           <Typography variant="h4">¿Perdiste un Objeto?</Typography>
// <IconButton>
//   <GoogleIcon></GoogleIcon>
// </IconButton>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Seteás el idioma por defecto a español
dayjs.locale("es");

function App() {
  return (
    <Box margin={"10px"}>
      <Typography align="center" variant="h2">
        Lost UdeA
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        minHeight={"80vh"}
      >
        <Box>
          <Typography variant="h4">¿Encontraste un Objeto?</Typography>

          <FormControl fullWidth required margin="dense">
            <InputLabel id="que-select-label">¿Que encontraste?</InputLabel>
            <Select
              labelId="que-select-label"
              id="que-select"
              // value={age}
              label="¿Que encontraste?"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ropa</MenuItem>
              <MenuItem value={20}>Celular</MenuItem>
              <MenuItem value={30}>Cable</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required margin="dense">
            <InputLabel id="donde-select-label">
              ¿Donde lo encontraste?
            </InputLabel>
            <Select
              labelId="donde-select-label"
              id="donde-select"
              // value={age}
              label="¿Donde lo encontraste?"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Bloque 18</MenuItem>
              <MenuItem value={20}>Bloque 19</MenuItem>
              <MenuItem value={30}>Biblioteca</MenuItem>
            </Select>
          </FormControl>

          {/* Datepicker */}
          <Box sx={{ my: 1 }} textAlign={"center"}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <MobileDatePicker
                label="¿Cuando lo encontraste?"
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Divider sx={{ width: "90%", my: 2 }}></Divider>

        <Box textAlign={"center"}>
          <Typography variant="h4">¿Perdiste un Objeto?</Typography>
          <IconButton>
            <GoogleIcon></GoogleIcon>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
