import {
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Filter = ({ sortBy, setSortBy, setSearch, searchByName }) => {
  const sortOptions = [
    "Precio Mayor a Menor",
    "Precio Menor a Mayor",
    "Precio en Oferta",
  ];

  return (
    <Grid container>
      <Grid item xs={6} className="inputSearch">
        <TextField
          fullWidth
          label="Buscar"
          variant="outlined"
          placeholder="Buscar por nombre"
          size="small"
          onChange={(e) => {
            searchByName(e.target.value);
            setSearch(e.target.value);
          }}
        />
        <IconButton color="primary">
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid item xs={6} className="inputSort">
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-age-native-simple">Ordenar</InputLabel>
          <Select
            native
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Ordenar"
            inputProps={{
              name: "Ordenar",
              id: "outlined-age-native-simple",
            }}
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filter;
