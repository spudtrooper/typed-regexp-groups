const spec = {
  enums: [
    {
      name: "email",
      fields: [
        { name: "name", type: "string" },
        { name: "domain", type: "string" },
      ],
    },
    {
      name: "ipv4",
      fields: [
        { name: "octect_0", type: "number" },
        { name: "octect_1", type: "number" },
        { name: "octect_2", type: "number" },
        { name: "octect_3", type: "number" },
      ],
    },
  ],
};

export default spec;