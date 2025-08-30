export const ChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 0 0 6l1.41 1.41L6 2.83l4.59 4.58L12 6 6 0Z" fill="#ADBFDF" />
  </svg>
);

export const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity=".8"
      d="M1.41.59 6 5.17 10.59.59 12 2 6 8 0 2 1.41.59Z"
      fill="#ADBFDF"
    />
  </svg>
);

export const Calendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.4 1.636h-.8V0H12v1.636H4V0H2.4v1.636h-.8c-.88 0-1.6.737-1.6 1.637v13.09C0 17.264.72 18 1.6 18h12.8c.88 0 1.6-.736 1.6-1.636V3.273c0-.9-.72-1.637-1.6-1.637Zm0 14.728H1.6V5.727h12.8v10.637Z"
      fill="#ADBFDF"
    />
  </svg>
);

export const IncomingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.522 1.177 11.345 0 1.67 9.675V4.174H0v8.348h8.348v-1.67H2.847l9.675-9.675Z"
      fill="#005FF8"
    />
  </svg>
);

export const OutgoingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m0 11.345 1.177 1.177 9.675-9.675v5.5h1.67V0H4.174v1.67h5.501L0 11.345Z"
      fill="#28A879"
    />
  </svg>
);

export const MissedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.522 1.177 11.345 0 1.67 9.675V4.174H0v8.348h8.348v-1.67H2.847l9.675-9.675Z"
      fill="#EA1A4F"
    />
  </svg>
);

export const NonCallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m0 11.345 1.177 1.177 9.675-9.675v5.5h1.67V0H4.174v1.67h5.501L0 11.345Z"
      fill="#EA1A4F"
    />
  </svg>
);
