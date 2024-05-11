
import { logger } from "../logging.js";
import { prismaClient } from "../database.js";

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                $on: jest.fn(),
                log: [],
            };
        }),
    };
});

jest.mock("../logging.js", () => {
    return {
        logger: {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
        },
    };
});

describe("Prisma Client", () => {
    it("should be defined", () => {
        expect(prismaClient).toBeDefined();
    });

    it("should call logger.info on 'query' event", () => {
        prismaClient.$on.mock.calls[0][1]('test');
        expect(logger.info).toHaveBeenCalledWith('test');
    });

    it("should call logger.error on 'error' event", () => {
        prismaClient.$on.mock.calls[1][1]('test');
        expect(logger.error).toHaveBeenCalledWith('test');
    });

    it("should call logger.info on 'info' event", () => {
        prismaClient.$on.mock.calls[2][1]('test');
        expect(logger.info).toHaveBeenCalledWith('test');
    });

    it("should call logger.warn on 'warn' event", () => {
        prismaClient.$on.mock.calls[3][1]('test');
        expect(logger.warn).toHaveBeenCalledWith('test');
    });
});