///
/// List.tsx
///

import Table from "react-bootstrap/Table";

type Event = { name: string; loc: string; date: string };

const events: Event[] = [
  { name: "Lambda Days 2020", loc: "Kraków", date: "February 2020" },
  { name: "ICICT 2020 Demo Presentation", loc: "San Diego, CA", date: "March 2020" },
  { name: "ICICT 2021 Paper Presentation", loc: "Kahului, HI", date: "March 2021" },
  { name: "IEEE ITPC 2021", loc: "Ewing, NJ", date: "March 2021" },
  { name: "IEEE ITPC 2022", loc: "Ewing, NJ", date: "March 2022" },
  { name: "TFPIE 2023", loc: "Boston, MA", date: "January 2023" },
  { name: "TFP 2023", loc: "Boston, MA", date: "January 2023" },
  { name: "IEEE ISEC 2023", loc: "Baltimore, MD", date: "March 2023" },
  { name: "IEEE ITPC 2023", loc: "Ewing, NJ", date: "March 2023" },
  { name: "Academia Nacional de Ingeniería", loc: "Caracas", date: "May 2023" },
  { name: "TFP 2024", loc: "South Orange, NJ", date: "January 2024" },
  { name: "IEEE ITPC 2024", loc: "Ewing, NJ", date: "March 2024" },
  { name: "IFL 2024", loc: "Nijmegen", date: "August 2024" },
  { name: "ICFP 2024", loc: "Milano", date: "September 2024" },
  { name: "TFP 2025", loc: "Oxford", date: "January 2025" },
  { name: "IEEE ITPC 2025", loc: "Ewing, NJ", date: "March 2025" },
  { name: "ICEMT 2026", loc: "Macau, China", date: "September 2026" }
];

function Events() {
  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        overflowY: "auto",
        backgroundColor: "#1e293b",
        borderRadius: "12px",
        border: "1px solid #334155",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h4
        style={{
          color: "#f8fafc",
          marginBottom: "16px",
          fontWeight: 600,
          borderBottom: "2px solid #3b82f6",
          paddingBottom: "8px",
          display: "inline-block",
        }}
      >
        Presentations at Conferences and Seminars
      </h4>
      <Table striped bordered hover variant="dark" style={{ marginTop: "12px" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>Event</th>
            <th style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>Location</th>
            <th style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((item) => (
            <tr key={item.name}>
              <td style={{ color: "#f8fafc", fontWeight: 500 }}>{item.name}</td>
              <td style={{ color: "#cbd5e1" }}>{item.loc}</td>
              <td style={{ color: "#f59e0b", fontWeight: 600 }}>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Events;