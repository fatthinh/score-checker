import { useAxios } from "../hooks/useAxios";
import { LoadingIcon } from "./../components/Icons";

function Reports() {
  const { response, loading } = useAxios({
    url: "group-a",
    method: "GET",
  });

  return (
    <div>
      <h1 className="text-lg font-bold">Top 10 greatest students group A</h1>

      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="w-full flex p-12 justify-center">
            <LoadingIcon className="w-10 h-10" />
          </div>
        ) : (
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">math</th>
                <th className="px-4 py-3">physic</th>
                <th className="px-4 py-3">chemistry</th>
                <th className="px-4 py-3">total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {response.map((item, index) => (
                <tr className="text-gray-700 dark:text-gray-400" key={index}>
                  <td className="px-4 py-3">{item.registration_num}</td>
                  {item.scores
                    .filter(
                      (score) =>
                        score.subject === "toan" ||
                        score.subject === "vat_li" ||
                        score.subject === "hoa_hoc"
                    )
                    .map((score) => (
                      <td className="px-4 py-3 text-sm" key={score.id}>
                        {score.value}
                      </td>
                    ))}
                  <td className="px-4 py-3 text-sm">
                    {item.scores
                      .filter(
                        (score) =>
                          score.subject === "toan" ||
                          score.subject === "vat_li" ||
                          score.subject === "hoa_hoc"
                      )
                      .reduce((total, item) => total + item.value, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;
