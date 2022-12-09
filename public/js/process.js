$(document).ready(function () {
  getListData();

  const SM_ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_total",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCountStudent",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "getStudentByIndex",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "studentList",
      outputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "total",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  const SM_address = "0x8767846347F885B4e4D9ec9c2Ea87673f4Ea4C4F";
  var web3 = new Web3(window.ethereum);
  window.ethereum.enable();
  var contractInstance = web3.eth.Contract(SM_ABI, SM_address);

  checkMetamask();
  var currentAccount = null;
  var web3Infura = new Web3(
    "wss://goerli.infura.io/ws/v3/d45a95f5aa3742a1a0db7f849ed2a542"
  );

  var infuraInstance = web3Infura.eth.Contract(SM_ABI, SM_address);

  // listen emit events
  infuraInstance.events.Deposit(
    {
      fromBlock: "latest",
      filter: {},
    },
    (err, data) => {
      if (data) {
        $("#studentList").append(
          `<tr>
            <td>222</td>
            <td>${data.returnValues._name}</td>
            <td>${data.returnValues._sender}</td>
            <td>${data.returnValues._amount / Math.pow(2, 18)}</td>
          </tr>`
        );
      }
      if (err) {
        console.log("err", err);
      }
    }
  );
  // Connect Metamask
  $("#btn_connect").click(() => {
    connect()
      .then((accounts) => {
        currentAccount = accounts[0];
        $("#btn_connect").hide(0);
        $("#wallet_address").text(`Wallet Address: ${currentAccount}`);
      })
      .catch((err) => console.log({ err }));
  });

  $("#form_deposit").submit((event) => {
    event.preventDefault();
    const name = $("#name").val();
    const amount = $("#amount").val();

    if (name === "" || amount === "") {
      alert("Please enter your name and amount");
      return;
    }

    const amountWei = contractInstance.utils.toWei(amount, "ether");

    contractInstance.methods
      .deposit(name)
      .send({ from: currentAccount, value: amountWei })
      .on("transactionHash", (hash) => {
        console.log({ hash });
      })
      .catch((err) => {
        console.log({ err });
        $("#pronounce").text(err.message);
      });
  });

  // Listen change account !
  window.ethereum.on("accountsChanged", (accounts) => {
    currentAccount = accounts[0];
    $("#btn_connect").hide(0);
    $("#wallet_address").text(`Wallet Address: ${currentAccount}`);
  });
});

async function connect() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  return accounts;
}

const checkMetamask = () => {
  if (typeof window.ethereum !== "undefined") {
    $("#info").fadeIn(1000);
  } else {
    $("#install").css("display", "block");
  }
};

const getContract = () => {
  const SM_ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_total",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCountStudent",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "getStudentByIndex",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "studentList",
      outputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "total",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];
  const SM_address = "0x8767846347F885B4e4D9ec9c2Ea87673f4Ea4C4F";
  const web3 = new Web3(window.ethereum || "https://goerli.infura.io/v3");
  window.ethereum.enable();
  const SM = web3.eth.Contract(SM_ABI, SM_address);
  return SM;
};

const getListData = async () => {
  const contractInstance = getContract();

  const studentSize = await contractInstance.methods.getCountStudent().call();

  const getDataByIndex = async (index) => {
    const student = await contractInstance.methods
      .getStudentByIndex(index)
      .call();
    return student;
  };

  const studentList = [];

  for (let i = 0; i < studentSize; i++) {
    const student = await getDataByIndex(i);
    const data = {
      address: student[0],
      amount: +student[1] / Math.pow(10, 18),
      name: student[2],
    };
    $("#studentList").append(
      `<tr>
        <td>${i + 1}</td>
        <td>${data.name}</td>
        <td>${data.address}</td>
        <td>${data.amount}</td>
      </tr>`
    );
    studentList.push(data);
  }
};
