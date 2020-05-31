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
import axios from 'axios'

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
  // createData('Frozen yoghurt', 159, 6.0, 24, 'https://stackoverflow.com/questions/57136853/make-a-material-ui-component-in-react-sticky-when-scrolling-not-appbar'),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  
];

const user = localStorage.getItem('user')

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowss, setRowss] = React.useState(rows);
  const [isLoading, setIsLoading] = React.useState(true);
  const [onlyOnceLoad, setOnlyOnceLoad] = React.useState(true)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect( () => {
    // Timer is in minute you want to refetch the data from api
    let timer = 5;
    // let user1 = "j@j.com"
    console.log(user)
    if (onlyOnceLoad) {
      console.log("Started Once")
      const temp = []

      async function fetchJSON() {
        var response = await axios.post('https://webappsvc-investor-buddy.azurewebsites.net/users/getUpdates', {
          user: user
        })

        var table = await JSON.parse(JSON.stringify([...response.data.table]))
        // return table

      //  const table = await fetchJSON();
      // console.log("TAble ",await table )
        setIsLoading(false);

        let ii = 0
        let obj =  Object.keys(await table).map(async (e,i) => {
          ii += 1
                // console.log(i, " ",await table[ii])
                  temp.push(createData(table[i].symbol,table[i].company, table[i].sentiment,
                    table[i].date, table[i].news))
                  
                  if (ii === table.length) {
                    // console.log("Done done done")
                    let result = JSON.stringify([...temp])
                    // console.log("Result", JSON.parse(result))
                    // console.log("Initial", rows)
                    setRowss(JSON.parse(result))
                    setIsLoading(false)
                    
                  }
              })
            
      };
      fetchJSON()
      console.log(isLoading, rowss);
      setOnlyOnceLoad(false);
    }

    const intervalId = setInterval(() => {
      console.log("Started")
      const temp = []

      async function fetchJSON() {
        var response = await axios.post('https://webappsvc-investor-buddy.azurewebsites.net/users/getUpdates', {
          user: user
        })

        var table = await JSON.parse(JSON.stringify([...response.data.table]))
        // return table
        // const table = await fetchJSON();
        // console.log("TAble ",await table )
        setIsLoading(false);
  
        let ii = 0
        let obj =  Object.keys(await table).map(async (e,i) => {
          ii += 1
                // console.log(i, " ",await table[ii])
                  temp.push(createData(table[i].symbol,table[i].company, table[i].sentiment,
                    table[i].date, table[i].news))
                  
                  if (ii === table.length) {
                    // console.log("Done done done")
                    let result = JSON.stringify([...temp])
                    // console.log("Result", JSON.parse(result))
                    // console.log("Initial", rows)
                    setRowss(JSON.parse(result))
                    setIsLoading(false)
                    
                  }
              })
      };
     
      fetchJSON();    
      console.log(isLoading, rowss);
    }, 1000*timer*60)

  return () => clearInterval(intervalId); //This is important
  }, [])

  return (
      <div>
      {!isLoading ? 
        <Box p={5} px={12}>
          <Card className={classes.root} raised={true}>
            <TableContainer className={classes.container} >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => <StyledTableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </StyledTableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowss.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return <StyledTableRow hover >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <StyledTableCell key={column.id} align={column.align}>
                                  {column.id === 'news_source' ? 
                                  Array.from(row[column.id]).map(url => <a href={value} target="_blank">{value}</a>): value}
                                </StyledTableCell>
                            );
                          })}
                        </StyledTableRow>;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rowss.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Card>
        </Box>

        : <div style={{color:"white", fontSize:"20px"}}> <p>Please wait! Fetching organisations...</p> </div>
  }
  </div>
  )
}
