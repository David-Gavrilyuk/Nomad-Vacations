import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface DownloadCSVProps {
  labels: string[];
  datasets: any[];
}

function DownloadCSV({ labels, datasets }: DownloadCSVProps): JSX.Element {
  const handleDownloadCSV = () => {
    const csvData = convertToCSV(labels, datasets);

    const csvFile = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(csvFile, "Vacation Followers.csv");
  };

  const convertToCSV = (labels: string[], datasets: any[]): string => {
    let csv = "Destination,Followers\n";
    for (let i = 0; i < labels.length; i++) {
      csv += `${labels[i]},${datasets[0].data[i]}\n`;
    }
    return csv;
  };

  return (
    <div className="DownloadCSV">
      <Button color="primary" variant="contained" aria-label="outlined primary button group" onClick={handleDownloadCSV}>
        Download CSV
        <FileDownloadIcon />
      </Button>
    </div>
  );
}

export default DownloadCSV;
