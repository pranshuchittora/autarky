import React, { useMemo } from "react";
import InkTable from "ink-table";

interface ITableProps {
  data: any[];
}

const Table: React.FunctionComponent<ITableProps> = props => {
  const data = useMemo(() => {
    const newData = [...props.data];
    return newData.map(obj => {
      return {
        Location: obj.value,
        Size: obj.size_label,
        Time: obj.time_label,
      };
    });
  }, [props.data]);
  return <InkTable data={data} />;
};

export default Table;
