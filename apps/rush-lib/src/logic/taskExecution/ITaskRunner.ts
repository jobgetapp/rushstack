﻿// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import type { StdioSummarizer } from '@rushstack/terminal';
import type { CollatedWriter } from '@rushstack/stream-collator';

import type { TaskStatus } from './TaskStatus';
import type { CommandLineConfiguration } from '../../api/CommandLineConfiguration';

export interface ITaskRunnerContext {
  repoCommandLineConfiguration: CommandLineConfiguration;
  collatedWriter: CollatedWriter;
  stdioSummarizer: StdioSummarizer;
  quietMode: boolean;
  debugMode: boolean;
}

/**
 * The `Task` class is a node in the dependency graph of work that needs to be scheduled by the
 * `TaskExecutionManager`. Each `Task` has a `runner` member of type `BITaskRunner`, whose implementation
 * manages the actual operations for running a single task.
 */
export interface ITaskRunner {
  /**
   * Name of the task definition.
   */
  readonly name: string;

  /**
   * This flag determines if the task is allowed to be skipped if up to date.
   */
  isSkipAllowed: boolean;

  /**
   * Assigned by execute().  True if the script was an empty string.  Operationally an empty string is
   * like a shell command that succeeds instantly, but e.g. it would be odd to report time statistics for it.
   */
  hadEmptyScript: boolean;

  /**
   * If set to true, a warning result should not make Rush exit with a nonzero
   * exit code
   */
  warningsAreAllowed: boolean;

  /**
   * Indicates if the output of this task may be written to the cache
   */
  isCacheWriteAllowed: boolean;

  /**
   * Method to be executed for the task.
   */
  executeAsync(context: ITaskRunnerContext): Promise<TaskStatus>;
}
