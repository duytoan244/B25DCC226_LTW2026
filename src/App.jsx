import { useState } from "react";
import StudentList from "./StudentList";
import "./style.css";

const initialStudents = [
  {
    id: 1,
    name: "Nguyễn Văn Vẻ",
    score: 8.5,
    class: "D25CQCC06",
  },
  {
    id: 2,
    name: "Nguyễn Thanh Tùng",
    score: 6.5,
    class: "D25CQCC01",
  },
  {
    id: 3,
    name: "Phùng Thanh Độ",
    score: 4,
    class: "D26CQCC02",
  },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [className, setClassName] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const handleAddStudent = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedClass = className.trim();
    const numericScore = Number(score);

    if (!trimmedName || !trimmedClass || score === "") {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (numericScore < 0 || numericScore > 10 || Number.isNaN(numericScore)) {
      setError("Điểm số phải từ 0 đến 10.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: trimmedName,
      score: numericScore,
      class: trimmedClass,
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);

    setName("");
    setScore("");
    setClassName("");
    setError("");
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  const filteredStudents = students.filter((student) => {
    if (filter === "good") {
      return student.score >= 8;
    }

    if (filter === "fail") {
      return student.score < 5;
    }

    return true;
  });

  const totalStudents = students.length;

  const averageScore =
    students.length > 0
      ? students.reduce((total, student) => total + student.score, 0) /
        students.length
      : 0;

  return (
    <div className="app">
      <header className="header">
        <h1>Quản Lý Điểm Sinh Viên</h1>
        <p>Ứng dụng quản lý danh sách và điểm sinh viên</p>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>Thêm sinh viên</h2>

          <form onSubmit={handleAddStudent} className="student-form">
            <div className="form-group">
              <label>Họ tên</label>
              <input
                type="text"
                placeholder="Nhập họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Điểm số</label>
              <input
                type="number"
                placeholder="0 - 10"
                min="0"
                max="10"
                step="0.1"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Lớp</label>
              <input
                type="text"
                placeholder="Nhập lớp"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>

            <button type="submit" className="add-button">
              + Thêm sinh viên
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </section>

        <section className="filter-section">
          <h2>Lọc sinh viên</h2>

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Tất cả
            </button>

            <button
              className={filter === "good" ? "active" : ""}
              onClick={() => setFilter("good")}
            >
              Giỏi (≥ 8)
            </button>

            <button
              className={filter === "fail" ? "active" : ""}
              onClick={() => setFilter("fail")}
            >
              Trượt (&lt; 5)
            </button>
          </div>
        </section>

        <section className="student-section">
          <h2>Danh sách sinh viên</h2>

          <StudentList
            students={filteredStudents}
            onDelete={handleDeleteStudent}
          />
        </section>

        <section className="statistics">
          <div className="stat-card">
            <span>Tổng số sinh viên</span>
            <strong>{totalStudents}</strong>
          </div>

          <div className="stat-card">
            <span>Điểm trung bình</span>
            <strong>{averageScore.toFixed(2)}</strong>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;