"use client";
import Image from "next/image";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import Header from "@/components/layouts/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const Profile = () => {
  const lineData = {
    labels: [
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
      "May 2024",
      "Jun 2024",
      "Jul 2024",
    ],
    datasets: [
      {
        label: "Contest Rating",
        data: [1578, 1580, 1600, 1620, 1610, 1630, 1642],
        borderColor: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Problems Solved",
        data: [203, 216, 20],
        backgroundColor: [
          "rgba(0, 128, 0, 0.7)",
          "rgba(255, 165, 0, 0.7)",
          "rgba(255, 0, 0, 0.7)",
        ],
      },
    ],
  };

  const contributionData = {
    labels: Array.from(
      { length: 12 },
      (_, i) =>
        [
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
        ][i]
    ),
    datasets: [
      {
        label: "Submissions",
        data: [10, 20, 15, 25, 30, 45, 50, 60, 70, 65, 80, 90],
        backgroundColor: Array.from(
          { length: 12 },
          (_, i) => "rgba(0, 255, 0, 0.6)"
        ),
      },
    ],
  };

  const pieData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [203, 216, 20],
        backgroundColor: [
          "rgba(0, 128, 0, 0.7)",
          "rgba(255, 165, 0, 0.7)",
          "rgba(255, 0, 0, 0.7)",
        ],
        hoverBackgroundColor: [
          "rgba(0, 128, 0, 1)",
          "rgba(255, 165, 0, 1)",
          "rgba(255, 0, 0, 1)",
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row text-white min-h-screen p-5 space-y-5 md:space-y-0 md:space-x-5">
        <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md w-full md:w-1/3">
          <div className="flex items-center space-x-4">
            <Image
              src="/assets/cloud.svg"
              alt="Profile Picture"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">Nishant Tiwari</h2>
              <p>@its-nishant320</p>
              <p>Rank 140,267</p>
              <button className="mt-2 px-4 py-2 bg-green-600 rounded-lg">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="mt-5">
            <p>
              <i className="fas fa-map-marker-alt"></i> India
            </p>
            <p>
              <i className="fab fa-github"></i> nishant-Tiwari24
            </p>
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Community Stats</h3>
            <p>
              <i className="fas fa-eye"></i> Views: 7
            </p>
            <p>
              <i className="fas fa-check"></i> Solution: 4
            </p>
            <p>
              <i className="fas fa-comments"></i> Discuss: 0
            </p>
            <p>
              <i className="fas fa-star"></i> Reputation: 0
            </p>
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Languages</h3>
            <p>C++: 395 problems solved</p>
            <p>MySQL: 24 problems solved</p>
            <p>JavaScript: 11 problems solved</p>
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Skills</h3>
            <p>Dynamic Programming x31</p>
            <p>Divide and Conquer x13</p>
          </div>
        </div>
        <div className="flex-grow space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md">
              <h3 className="font-bold">Contest Rating</h3>
              <Line data={lineData} height={200} />
            </div>
            <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md">
              <h3 className="font-bold">Problems Solved</h3>
              <Bar data={barData} height={200} />
            </div>
            <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md">
              <h3 className="font-bold">Contribution Chart</h3>
              <Line data={contributionData} height={200} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md">
              <h3 className="font-bold">Badges</h3>
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md">
              <h3 className="font-bold">Milestones</h3>
              <ul className="space-y-2">
                <li>Completed 200 Easy Problems - Jan 2024</li>
                <li>Reached 1600 Rating - Mar 2024</li>
                <li>Solved 20 Hard Problems - Jun 2024</li>
              </ul>
            </div>
          </div>
          <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md">
            <h3 className="font-bold">Recent Submissions</h3>
            <ul className="space-y-2">
              <li>
                Minimum Deletions to Make Character Frequencies Unique - 16
                hours ago
              </li>
              <li>Allow One Function Call - 4 days ago</li>
              <li>Number of Senior Citizens - 6 days ago</li>
              <li>Find the Smallest Divisor given a Threshold - 6 days ago</li>
            </ul>
          </div>
          <div className="bg-zinc-900 border-zinc-800 border-[1px] p-5 rounded-lg shadow-md">
            <h3 className="font-bold">Recent Submissions</h3>
            <ul className="space-y-2">
              <li>
                Minimum Deletions to Make Character Frequencies Unique - 16
                hours ago
              </li>
              <li>Allow One Function Call - 4 days ago</li>
              <li>Number of Senior Citizens - 6 days ago</li>
              <li>Find the Smallest Divisor given a Threshold - 6 days ago</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
