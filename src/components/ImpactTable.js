import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Box} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#424242",
    color: theme.palette.common.white,
    fontSize: 14,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#eeeeee" //theme.palette.action.hover,
    },
  },
}))(TableRow);

const columns = [
  { id: 'ticker', label: 'Ticker', minWidth: 20 },
  { id: 'company_name', label: 'Company Name', minWidth: 40 },
  { id: 'impact', label: 'Expected Impact', minWidth: 20, align: 'right' },
  { id: 'last_updated', label: 'Last Updated', minWidth: 20, align: 'right' },
  { id: 'news_source', label: 'News Source', minWidth: 80, align: 'right' },
];

function createData(ticker, company_name, impact, last_updated, news_source) {
  return { ticker, company_name, impact, last_updated, news_source };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 650,
  },
});

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowss, setRowss] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    console.log("Started")
    setIsLoading(true)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };

    fetch('https://webappsvc-investor-buddy.azurewebsites.net/users/getUpdates', requestOptions)
      .then(results => results.json())
      .then(data => {
        console.log("Data is here")
        console.log(data) 
        Object.keys(data.table).map((e,i) => {
          console.log(i, " ", data.table[i])
          const temp = []
          temp.push(createData(data.table[i].symbol, data.table[i].company, data.table[i].sentiment,
             data.table[i].date, data.table[i].news))
        })
        setRowss(data)
        setIsLoading(false)
      });
    }, []);

  return (
    <Box p={5}>
      <Card className={classes.root} raised="true">
        <TableContainer className={classes.container} >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowss.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <StyledTableRow hover >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
