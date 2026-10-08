const StudentItem = ({ student, index, onDelete }) => {
  const { name, score, class: className } = student;

  const getRank = () => {
    if (score >= 8) {
      return "Giỏi";
    }

    if (score < 5) {
      return "Trượt";
    }

    return "Đạt";
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{className}</td>
      <td>
        <span
          className={`rank ${
            score >= 8 ? "good" : score < 5 ? "fail" : "pass"
          }`}
        >
          {getRank()}
        </span>
      </td>
      <td>
        <button
          className="delete-button"
          onClick={() => onDelete(student.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;