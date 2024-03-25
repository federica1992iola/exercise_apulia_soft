/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IRequestOptions, IResponseData, IResponseError } from "../common/Common";
import { RowExampleData } from "../example-table/ExampleTable";

export const useFetch = (url: string, requestOptions: IRequestOptions) => {
  const [data, setData] = useState<IResponseData | null>(null);
  const [error, setError] = useState<IResponseError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
 
  useEffect(() => {
    if(isLoading === true){
        setIsLoading(false);
        fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if(data && typeof Array.isArray(data)){
                const fRows: RowExampleData[] = data.map((d: any) => ({
                    id: d.id,
                    project: d.project,
                    employee: d.employee,
                    date: new Date(d.date),
                    hours: d.hours
                  }))
                setData({ value: fRows });
            }
            if(data.error){
                setError({ message: data.error });
            }
        })
    }
  }, [requestOptions, url, isLoading]);
 
  return { data, isLoading, error };
};
 