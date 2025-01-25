import { createContext, useEffect, useState } from "react";
import handleAxiosError from "../services/handleAxiosError";
import { AxiosError } from "axios";
import apiTownHall from "../services/COC-service-townhall";
import { dialogs } from "../dialogs/dialogs";
import { useNavigate } from "react-router-dom";
import { COCTownhallDataType } from "../Types/TownHalls/COCTownhallDataType";

export interface TownHallContexttype {
  townHalls: COCTownhallDataType[]; // Fix: Correct name
  getAllTownHalls: () => Promise<void>; // Returns void because it updates state
  deleateTownHall: (id: string) => Promise<void>;
  updateTownHall: (data: COCTownhallDataType) => Promise<void>;
  createTownHall: (data: COCTownhallDataType) => Promise<void>;
  fetchSingleTownHall: (level: number) => Promise<COCTownhallDataType>;
  isLoadingTownHall: boolean;
  errorTownHall: string | null;
}

const TownHallContext = createContext<TownHallContexttype | null>(null);

function TownHallProvider({ children }: { children: React.ReactNode }) {
  // State variables
  const [townHalls, setTownHalls] = useState<COCTownhallDataType[]>([]);
  const [isLoadingTownHall, setIsLoadingTownHall] = useState(false);
  const [errorTownHall, setErrorTownHall] = useState<string | null>(null);
  const navigate = useNavigate();

  // Utility for handling async operations
  const handleAsyncOperation = async (operation: () => Promise<any>) => {
    setIsLoadingTownHall(true);
    setErrorTownHall(null);

    dialogs.load();

    try {
      const result = await operation();
      setIsLoadingTownHall(false);
      dialogs.closeLoad();
      return result;
    } catch (err) {
      dialogs.closeLoad();
      handleAxiosError(err as AxiosError, (message) => {
        setErrorTownHall(message);
        dialogs.error(message);
      });
      throw err;
    } finally {
      setIsLoadingTownHall(false);
    }
  };

  useEffect(() => {
    getAllTownHalls();
  }, []);

  // Fetch all town halls
  const getAllTownHalls = async () => {
    await handleAsyncOperation(async () => {
      const result = await apiTownHall.getAll();
      if (result.status === 200) {
        setTownHalls(result.data);
      }
    });
  };

  // Delete a town hall
  const deleateTownHall = async (id: string) => {
    await handleAsyncOperation(async () => {
      const result = await apiTownHall.delete(id);
      if (result.status === 204) {
        setTownHalls((prev) => prev.filter((th) => th.id !== id));
        dialogs.success("Town hall deleted successfully");
      }
    });
  };

  // Update a town hall
  const updateTownHall = async (data: COCTownhallDataType) => {
    await handleAsyncOperation(async () => {
      const result = await apiTownHall.update(data);
      if (result.status === 200) {
        setTownHalls((prev) =>
          prev.map((th) => (th.id === data.id ? result.data : th))
        );
        dialogs.success("Town hall updated successfully");
      }
    });
  };

  // Create a town hall
  const createTownHall = async (data: COCTownhallDataType) => {
    await handleAsyncOperation(async () => {
      const result = await apiTownHall.create(data);
      if (result.status === 201) {
        setTownHalls((prev) => [...prev, result.data]);
        navigate("");
      }
    });
  };

  // Fetch a single town hall
  const fetchSingleTownHall = async (
    level: number
  ): Promise<COCTownhallDataType> => {
    const result = await handleAsyncOperation(() =>
      apiTownHall.getSingle(level)
    );
    return result.data;
  };

  // Context value
  const contextValue: TownHallContexttype = {
    townHalls,
    getAllTownHalls,
    deleateTownHall,
    updateTownHall,
    createTownHall,
    fetchSingleTownHall,
    isLoadingTownHall,
    errorTownHall,
  };

  return (
    <TownHallContext.Provider value={contextValue}>
      {children}
    </TownHallContext.Provider>
  );
}

export { TownHallProvider, TownHallContext };
