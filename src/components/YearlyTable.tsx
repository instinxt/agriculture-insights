import { Table } from "@mantine/core";
import { aggregatedByYearDataType } from "../types/dataTypes";

export const YearlyTable = ({ data }: { data: aggregatedByYearDataType }) => {
    //Convert Map to Array for itertion
    const values = Array.from(data);

    // Map aggregated data to table records
    const records = values.map((value) => {
        // Extract year value from aggregated data key
        const year = value[0].split(', ')[1];
        return (
            <tr key={year}>
                <td>{year}</td>
                <td>{value[1].maxProduction.cropName}</td>
                <td>{value[1].minProduction.cropName}</td>
            </tr>
        );
    });


    return (
        <>
            <h2>Maximum and Minimum Production Crop by Financial Year(Apr-Mar)</h2>
            <div className="table-container">
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Year</Table.Th>
                            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
                            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{records}</Table.Tbody>
                </Table>
            </div>
        </>
    );
};