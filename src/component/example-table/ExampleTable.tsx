/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef, GridTreeNodeWithRender, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useFetch } from '../services/useFetch';
import { IRequestOptions } from '../common/Common';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { useEffect, useState } from 'react';

export interface MainData {
  id: number,
  name: string
}
export interface RowExampleData {
    project: MainData,
    employee: MainData,
    date: Date,
    hours: number 
}
export default function ExampleTable() {
  const columns: GridColDef<RowExampleData>[] = [
    { field: 'id', headerName: 'Id', type: 'number',  width: 50 },
    { 
      field: 'project', headerName: 'Project', type: 'string',  width: 250,
      valueGetter: (params: GridValueGetterParams<RowExampleData, any, GridTreeNodeWithRender>) => {
        return params.value['name']
      },
    },
    { field: 'employee', headerName: 'Employee', type: 'string', width: 250,
      valueGetter: (params: GridValueGetterParams<RowExampleData, any, GridTreeNodeWithRender>) => {
        return params.value['name']
      }, 
    },
    { field: 'date', headerName: 'Date', width: 250,
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        const current = params.value;
        if (current == null) {
          return '';
        }
        const month = current.toLocaleString('default', { month: 'short' });
        return `${current.getDate()} ${month} ${current.getFullYear()}`;
      }
    },
    { field: 'hours', headerName: 'Hours', type: 'number', width: 50 },
  ];
  const url = "http://localhost:3000/exampleTableData";
  const requestOptions: IRequestOptions = { method: 'GET', headers: {'Content-Type': 'application/json'}};
  const { data, isLoading, error } = useFetch(url, requestOptions);
  const [ rows, setRows] = useState<RowExampleData[] | null>(null);

  useEffect(() => {
    if(isLoading === false){
      console.log('qua')
      setRows(data !== null ? [...data.value] : [])
    }
  }, [isLoading, data]);
  
  const aggregationData = (data: RowExampleData[], ...groupBy: (keyof RowExampleData)[]): void => {
    const aggregatedDataMap = new Map<string, RowExampleData>();

    for (const entry of data) {
        const key = groupBy.map(param => entry[param].id || entry[param]).join('_');
        const existingEntry = aggregatedDataMap.get(key);

        if (existingEntry) {
            existingEntry.hours += entry.hours;
        } else {
            aggregatedDataMap.set(key, { ...entry });
        }
    }
    
    setRows(Array.from(aggregatedDataMap.values()))
  }
  
  const loadingStatement = (): JSX.Element => <div>Loading...</div>
  
  if (isLoading) return (
      loadingStatement()
  )

  return (
        <div style={{ height: '100%', width: '100%' }}>
            {error && <div>{error.message}</div>}
            {rows && (
               <Box component={"main"} sx={{ p: 3, flexWrap: 'wrap', display: 'flex' }}>
                <Box sx={{ width: '100%' }}>
                  <Button variant="contained" sx={{ marginRight: '1rem' }} 
                    onClick={() => aggregationData(data !== null ? data.value : [], 'project')}>Group by Project </Button>
                  <Button variant="contained" sx={{ marginRight: '1rem' }} 
                    onClick={() => aggregationData(data !== null ? data.value : [], 'employee')}>Group by Employee </Button>
                  <Button variant="contained" sx={{ marginRight: '1rem' }} 
                    onClick={() => aggregationData(data !== null ? data.value : [], 'date')}>Group by Date </Button>
                  <Button variant="contained" sx={{ marginRight: '1rem' }} 
                    onClick={() => aggregationData(data !== null ? data.value : [], 'project', 'employee')}>Group by Project and Employee </Button>
                  <Button variant="contained" sx={{ marginRight: '1rem' }} 
                    onClick={() => aggregationData(data !== null ? data.value : [], 'employee', 'project')}>Group by Employee and Project </Button>
                </Box>
               
                <Box sx={{ width: '100%', marginTop: '5rem' }}>
                <DataGrid rows={rows} columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                  columns: {
                    columnVisibilityModel: {
                      // Hide column
                      id: false
                    }
                  },
                }}
                pageSizeOptions={[5]}
              />
                </Box>
                
               </Box>
            
            )
            
            
            }
        </div>
      );
}